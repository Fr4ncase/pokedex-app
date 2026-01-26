// Node modules
import { useRef, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

// Components
import { PokemonCard } from '@/components/PokemonCard';

// Types
import type { PokemonBasic } from '@/schemas/pokemon';

// Interfaces
interface PokemonGridProps {
  pokemons: PokemonBasic[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function PokemonGrid({
  pokemons,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PokemonGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(5);
  const isFetchingRef = useRef(false);

  // Constantes de tamaño
  const CARD_HEIGHT = 192; // h-48 = 192px
  const CARD_WIDTH = 144; // w-36 = 144px

  // Calcular cuántas columnas caben
  const calculateColumns = () => {
    if (typeof window === 'undefined') return 5;
    const containerWidth = window.innerWidth - 32; // Restar padding (px-4 = 16px cada lado)
    return Math.max(1, Math.floor(containerWidth / CARD_WIDTH));
  };

  // Actualizar columnas cuando cambia el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      const newColumns = calculateColumns();
      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    };

    // Calcular al montar
    handleResize();

    // Escuchar cambios de tamaño con debounce para mejor performance
    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100) as unknown as number;
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [columns]);

  // Calcular el número de filas basado en las columnas y pokémon
  const rows = Math.ceil(pokemons.length / columns);

  // Crear el virtualizador por filas
  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT,
    overscan: 0,
  });

  // Sincronizar la referencia con el estado de fetching
  useEffect(() => {
    if (!isFetchingNextPage) {
      isFetchingRef.current = false;
    }
  }, [isFetchingNextPage]);

  // Detectar cuando necesitamos cargar más datos basado en scroll
  useEffect(() => {
    const element = parentRef.current;
    if (!element) return;

    const handleScroll = () => {
      // Evitar múltiples fetches simultáneos
      if (isFetchingRef.current || isFetchingNextPage || !hasNextPage) return;

      // Usar scroll position directamente - más confiable
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      // Distancia desde el final del scroll
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      // Solo cargar cuando estemos EXTREMADAMENTE cerca del final
      // 1 fila = 192px, solo cargar cuando quede menos de 1 fila
      const threshold = CARD_HEIGHT; // 192px = exactamente 1 fila
      const shouldFetch = distanceFromBottom < threshold;

      if (shouldFetch) {
        isFetchingRef.current = true;
        fetchNextPage();
      }
    };

    // Throttle para scroll - solo ejecutar cada 300ms
    let throttleTimeout: number | null = null;
    const throttledScroll = () => {
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        handleScroll();
        throttleTimeout = null;
      }, 300) as unknown as number;
    };

    element.addEventListener('scroll', throttledScroll);
    
    // Chequear al montar SOLO si no hay suficiente contenido para scrollear
    const checkInitial = () => {
      if (isFetchingRef.current || isFetchingNextPage || !hasNextPage) return;
      
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      
      // Margen de seguridad: solo cargar si scrollHeight es MENOR que clientHeight
      // Esto significa que literalmente no hay barra de scroll
      if (scrollHeight <= clientHeight) {
        isFetchingRef.current = true;
        fetchNextPage();
      }
    };
    
    // Dar tiempo a que el virtualizador calcule las alturas
    setTimeout(checkInitial, 150);

    return () => {
      element.removeEventListener('scroll', throttledScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, CARD_HEIGHT]);

  return (
    <main
      ref={parentRef}
      className='w-full flex-1 overflow-y-auto custom-scrollbar px-4'
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const endIndex = Math.min(startIndex + columns, pokemons.length);
          const pokemonsInRow = pokemons.slice(startIndex, endIndex);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns}, ${CARD_WIDTH}px)`,
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  gap: 0,
                }}
              >
                {pokemonsInRow.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
