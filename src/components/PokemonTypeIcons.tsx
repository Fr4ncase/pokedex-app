// Custom modules
import { typeIcons, typeColors } from '@/assets/types';

// Types
import type { PokemonBasic } from '@/schemas/pokemon';

// Interfaces
interface PokemonTypeIconsProps {
  types: PokemonBasic['types'];
  containerClassName?: string;
  iconClassName?: string;
}

export const PokemonTypeIcons = ({
  types,
  containerClassName,
  iconClassName,
}: PokemonTypeIconsProps) => {
  return (
    <div className={containerClassName}>
      {types.map((typeSlot) => {
        const typeName = typeSlot.type.name;
        const color = typeColors[typeName];

        return (
          <img
            key={typeName}
            src={typeIcons[typeName]}
            alt={`Type ${typeName}`}
            title={typeName}
            className={`${iconClassName} object-contain type-icon-hover rounded-full`}
            style={
              {
                '--tw-shadow-color': color,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};
