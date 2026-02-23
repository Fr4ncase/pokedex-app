// Node modules
import { Fragment, type ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';

// Components
import { PokemonTypeIcons } from '@/components/PokemonTypeIcons';

// Types
import type { Pokemon, PokemonDetailView } from '@/types';
import type { PokemonEvolutionChain as EvolutionChainData } from '@/schemas/pokemon';

// Utils
import { getSpeciesColorHex, getTextColorHex } from '@/utils/pokemonColors';

// Helpers
function getSpeciesIdFromUrl(url: string | undefined): number | null {
  if (!url) return null;
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : null;
}

type ChainLink = EvolutionChainData['chain'];
type EvolutionDetails = NonNullable<
  ChainLink['evolution_details']
>[number];

export type EvolutionNode = {
  name: string;
  id: number | null;
  evolutionMethod: EvolutionDetails | null;
  children: EvolutionNode[];
};

function buildEvolutionTree(
  link: ChainLink,
  evolutionMethod: EvolutionDetails | null
): EvolutionNode {
  const species = link.species as { name: string; url?: string };
  return {
    name: species.name,
    id: getSpeciesIdFromUrl(species.url),
    evolutionMethod,
    children: (link.evolves_to ?? []).map((child) =>
      buildEvolutionTree(
        child,
        child.evolution_details?.[0] ?? null
      )
    ),
  };
}

function isLinearChain(node: EvolutionNode): boolean {
  if (node.children.length === 0) return true;
  if (node.children.length > 1) return false;
  return isLinearChain(node.children[0]);
}

function flattenLinearChain(node: EvolutionNode): EvolutionNode[] {
  const steps: EvolutionNode[] = [];
  let current: EvolutionNode | null = node;
  while (current) {
    steps.push(current);
    current =
      current.children.length === 1 ? current.children[0] : null;
  }
  return steps;
}

function isStarLayout(node: EvolutionNode): boolean {
  return (
    node.children.length > 1 &&
    node.children.every((c) => c.children.length === 0)
  );
}

function titleCase(str: string): string {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTimeOfDay(tod: string): string {
  if (tod === 'day') return 'Daytime';
  if (tod === 'night') return 'Nighttime';
  return tod.charAt(0).toUpperCase() + tod.slice(1);
}

function formatRelativeStats(val: number): string {
  if (val === 1) return 'Attack > Defense';
  if (val === -1) return 'Attack < Defense';
  return 'Attack = Defense';
}

function formatEvolutionMethod(details: EvolutionDetails | null): string {
  if (!details) return '';

  const trigger = details.trigger?.name ?? '';
  const parts: string[] = [];

  // Use-item trigger
  if (trigger === 'use-item' && details.item?.name) {
    return `Use ${titleCase(details.item.name)}`;
  }

  // Trade trigger
  if (trigger === 'trade') {
    parts.push('Trade');
    if (details.held_item?.name) parts.push(`holding ${titleCase(details.held_item.name)}`);
    if (details.trade_species?.name) parts.push(`for ${titleCase(details.trade_species.name)}`);
    return parts.join(' ');
  }

  // Shed trigger (Nincada → Shedinja)
  if (trigger === 'shed') return 'Shed';

  // Level-up trigger (most common, many sub-conditions)
  if (trigger === 'level-up') {
    if (details.min_level != null) {
      parts.push(`Level ${details.min_level}+`);
    } else {
      parts.push('Level up');
    }
    if (details.min_happiness != null) parts.push(`with ${details.min_happiness}+ Happiness`);
    if (details.min_affection != null) parts.push(`with ${details.min_affection}+ Affection`);
    if (details.min_beauty != null) parts.push(`with ${details.min_beauty}+ Beauty`);
    if (details.known_move?.name) parts.push(`knowing ${titleCase(details.known_move.name)}`);
    if (details.known_move_type?.name) parts.push(`knowing a ${titleCase(details.known_move_type.name)} move`);
    if (details.location?.name) parts.push(`at ${titleCase(details.location.name)}`);
    if (details.time_of_day) parts.push(`at ${formatTimeOfDay(details.time_of_day)}`);
    if (details.relative_physical_stats != null) parts.push(`(${formatRelativeStats(details.relative_physical_stats)})`);
    if (details.gender === 1) parts.push('(Female)');
    if (details.gender === 2) parts.push('(Male)');
    if (details.needs_overworld_rain) parts.push('during rain');
    if (details.turn_upside_down) parts.push('(upside down)');
    return parts.join(' ');
  }

  // Fallback for other/unknown triggers — still gather conditions
  if (trigger) parts.push(titleCase(trigger));
  if (details.min_level != null) parts.push(`Level ${details.min_level}+`);
  if (details.min_happiness != null) parts.push(`${details.min_happiness}+ Happiness`);
  if (details.known_move_type?.name) parts.push(`knows ${titleCase(details.known_move_type.name)} move`);
  if (details.time_of_day) parts.push(`at ${formatTimeOfDay(details.time_of_day)}`);
  return parts.join(' ') || '';
}

const LOCAL_IMAGE_BASE = '/pokemon-images';

interface PokemonEvolutionChainProps {
  pokemon: PokemonDetailView;
  pokemonList?: Pokemon[];
}

function getLayoutType(root: EvolutionNode): 'empty' | 'linear' | 'star' | 'tree' {
  if (root.children.length === 0) return 'empty';
  if (root.children.length === 1 && isLinearChain(root)) return 'linear';
  if (isStarLayout(root)) return 'star';
  return 'tree';
}

export const PokemonEvolutionChain = ({
  pokemon,
  pokemonList,
}: PokemonEvolutionChainProps) => {
  const speciesColorHex = getSpeciesColorHex(pokemon.speciesColor);
  const textColorHex = getTextColorHex(pokemon.speciesColor);
  const root = buildEvolutionTree(
    pokemon.evolutionChain.chain,
    null
  );
  const layoutType = getLayoutType(root);
  const currentName = pokemon.name.toLowerCase().replace(/\s/g, '-');

  const getStepImageSrc = (node: EvolutionNode) => {
    if (node.name === currentName) {
      return pokemon.image?.startsWith('/')
        ? pokemon.image
        : `${LOCAL_IMAGE_BASE}/${pokemon.id}.png`;
    }
    return `${LOCAL_IMAGE_BASE}/${node.id ?? 0}.png`;
  };

  const getStepTypes = (node: EvolutionNode) => {
    if (node.name === currentName) return pokemon.types;
    const found = pokemonList?.find((p) => p.id === node.id);
    return found?.types ?? [];
  };

  const renderPokemonBlock = (node: EvolutionNode, compact = false) => (
    <div className={`flex flex-col items-center ${compact ? 'scale-90 origin-center sm:scale-95' : ''}`}>
      <figure className="flex justify-center">
        <img
          src={getStepImageSrc(node)}
          alt={node.name}
          className={compact ? 'w-20 h-auto sm:w-24' : 'w-32 h-auto'}
        />
      </figure>
      <div className={`flex flex-col items-center ${compact ? 'mb-1' : 'mb-3'}`}>
        <span className={compact ? 'text-text-body text-xs' : 'text-text-body'}>
          #{node.id ?? node.name}
        </span>
        <span
          className={`rounded px-0.5 py-1 w-fit leading-none ${compact ? 'text-xs' : ''}`}
          style={{
            backgroundColor: speciesColorHex,
            color: textColorHex,
          }}
        >
          {node.name.toUpperCase().replace(/-/g, ' ')}
        </span>
      </div>
      <div>
        {(() => {
          const types = getStepTypes(node);
          return types.length > 0 ? (
            <PokemonTypeIcons
              types={types}
              containerClassName="flex justify-center gap-x-4"
              iconClassName={compact ? 'w-5 h-auto sm:w-6' : 'w-7 h-auto'}
            />
          ) : (
            <div className={`flex justify-center gap-x-4 ${compact ? 'min-h-5' : 'min-h-7'}`} />
          );
        })()}
      </div>
    </div>
  );

  const renderArrowAndMethod = (
    method: string,
    vertical = false
  ) => (
    <div
      className={`text-text-body flex flex-col items-center justify-center my-2 lg:my-0 ${
        vertical ? 'flex-col' : 'flex-col lg:flex-row'
      }`}
    >
      <span className="text-center text-sm max-w-[140px]">{method}</span>
      <ArrowDown className={`mt-1 ${vertical ? '' : 'lg:-rotate-90 lg:mt-0 lg:ml-1'}`} />
    </div>
  );

  if (layoutType === 'empty') {
    return (
      <div className="my-14">
        <div className="flex justify-center mb-8">
          <span
            className="text-2xl rounded px-0.5 py-1 leading-none"
            style={{
              backgroundColor: speciesColorHex,
              color: textColorHex,
            }}
          >
            EVOLUTION CHAIN
          </span>
        </div>
        <div className="flex justify-center">
          {renderPokemonBlock(root)}
        </div>
      </div>
    );
  }

  if (layoutType === 'linear') {
    const steps = flattenLinearChain(root);
    return (
      <div className="my-14">
        <div className="flex justify-center mb-8">
          <span
            className="text-2xl rounded px-0.5 py-1 leading-none"
            style={{
              backgroundColor: speciesColorHex,
              color: textColorHex,
            }}
          >
            EVOLUTION CHAIN
          </span>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-y-6 lg:gap-y-0 lg:gap-x-4 flex-wrap">
          {steps.flatMap((node, index) => {
            const pokemonBlock = (
              <div key={`pokemon-${node.name}`}>
                {renderPokemonBlock(node)}
              </div>
            );
            const methodBlock =
              index < steps.length - 1 ? (
                <div key={`method-${node.name}`}>
                  {renderArrowAndMethod(
                    formatEvolutionMethod(node.children[0]?.evolutionMethod ?? null)
                  )}
                </div>
              ) : null;
            return methodBlock ? [pokemonBlock, methodBlock] : [pokemonBlock];
          })}
        </div>
      </div>
    );
  }

  if (layoutType === 'star') {
    // 5x5 grid: evolution cards in outer ring (rows/cols 1,5), arrow+text in
    // intermediate ring (rows/cols 2,4), base pokemon at center (3,3).
    const allSlots = [
      { cardRow: 1, cardCol: 1, methRow: 2, methCol: 2, arrowDeg: 135  }, // 0: top-left ↖
      { cardRow: 1, cardCol: 3, methRow: 2, methCol: 3, arrowDeg: 180  }, // 1: top-center ↑
      { cardRow: 1, cardCol: 5, methRow: 2, methCol: 4, arrowDeg: -135 }, // 2: top-right ↗
      { cardRow: 3, cardCol: 1, methRow: 3, methCol: 2, arrowDeg: 90   }, // 3: middle-left ←
      { cardRow: 3, cardCol: 5, methRow: 3, methCol: 4, arrowDeg: -90  }, // 4: middle-right →
      { cardRow: 5, cardCol: 1, methRow: 4, methCol: 2, arrowDeg: 45   }, // 5: bottom-left ↙
      { cardRow: 5, cardCol: 3, methRow: 4, methCol: 3, arrowDeg: 0    }, // 6: bottom-center ↓
      { cardRow: 5, cardCol: 5, methRow: 4, methCol: 4, arrowDeg: -45  }, // 7: bottom-right ↘
    ];

    const slotOrderByCount: Record<number, number[]> = {
      2: [3, 4],
      3: [1, 3, 4],
      4: [1, 3, 4, 6],
      5: [0, 2, 3, 4, 6],
      6: [0, 1, 2, 5, 6, 7],
      7: [0, 1, 2, 3, 4, 5, 7],
      8: [0, 1, 2, 3, 4, 5, 6, 7],
    };
    const children = root.children;
    const slotIndices =
      slotOrderByCount[children.length] ??
      allSlots.map((_, i) => i).slice(0, children.length);

    return (
      <div className="my-14">
        <div className="flex justify-center mb-8">
          <span
            className="text-2xl rounded px-0.5 py-1 leading-none"
            style={{
              backgroundColor: speciesColorHex,
              color: textColorHex,
            }}
          >
            EVOLUTION CHAIN
          </span>
        </div>
        <div
          className="grid max-w-4xl mx-auto items-center justify-items-center"
          style={{
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gridTemplateRows: 'auto auto auto auto auto',
            gap: '0.25rem',
          }}
        >
          {/* Center: base Pokémon */}
          <div style={{ gridColumn: 3, gridRow: 3 }} className="flex flex-col items-center justify-center p-2">
            {renderPokemonBlock(root)}
          </div>
          {/* Evolutions + method/arrow in separate cells */}
          {children.map((child, index) => {
            const slotIdx = slotIndices[index];
            if (slotIdx == null) return null;
            const slot = allSlots[slotIdx];
            const method = formatEvolutionMethod(child.evolutionMethod);
            return (
              <Fragment key={child.name}>
                {/* Arrow + method text cell (between center and evolution) */}
                <div
                  className="flex flex-col items-center justify-center p-1"
                  style={{ gridColumn: slot.methCol, gridRow: slot.methRow }}
                >
                  <ArrowDown
                    className="mb-0.5 w-4 h-4 sm:w-5 sm:h-5 text-text-body"
                    style={{ transform: `rotate(${slot.arrowDeg}deg)` }}
                  />
                  <span className="text-center text-xs sm:text-sm text-text-body max-w-[120px] sm:max-w-[150px]">
                    {method}
                  </span>
                </div>
                {/* Evolution card cell */}
                <div
                  className="flex flex-col items-center justify-center"
                  style={{ gridColumn: slot.cardCol, gridRow: slot.cardRow }}
                >
                  {renderPokemonBlock(child, true)}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Tree layout: multiple levels, possibly multiple branches per level
  const renderTreeLevel = (
    nodes: EvolutionNode[],
    showMethod: boolean
  ): ReactNode => {
    if (nodes.length === 0) return null;
    return (
      <div className="flex flex-wrap justify-center items-start gap-x-6 gap-y-8">
        {nodes.map((node) => (
          <div key={node.name} className="flex flex-col items-center">
            {showMethod && node.evolutionMethod &&
              renderArrowAndMethod(
                formatEvolutionMethod(node.evolutionMethod),
                true
              )}
            {renderPokemonBlock(node)}
            {node.children.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 mt-4">
                {renderTreeLevel(node.children, true)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-14">
      <div className="flex justify-center mb-8">
        <span
          className="text-2xl rounded px-0.5 py-1 leading-none"
          style={{
            backgroundColor: speciesColorHex,
            color: textColorHex,
          }}
        >
          EVOLUTION CHAIN
        </span>
      </div>
      <div className="flex flex-col items-center gap-8">
        {renderTreeLevel([root], false)}
      </div>
    </div>
  );
};
