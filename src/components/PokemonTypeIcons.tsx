// Custom modules
import { typeIcons, typeColors } from '@/assets/types';

// Types
type TypeSlot = string | { type: { name: string } };
import type { TypeName } from '@/types';

// Interfaces
interface PokemonTypeIconsProps {
  types: TypeSlot[];
  containerClassName?: string;
  iconClassName?: string;
}

function getTypeName(slot: TypeSlot): string {
  return typeof slot === 'string' ? slot : slot.type?.name ?? '';
}

export const PokemonTypeIcons = ({
  types,
  containerClassName,
  iconClassName,
}: PokemonTypeIconsProps) => {
  return (
    <div className={containerClassName}>
      {types.map((typeSlot: TypeSlot) => {
        const typeName = getTypeName(typeSlot);
        if (!typeName) return null;
        const color = typeColors[typeName as TypeName];

        return (
          <img
            key={typeName}
            src={typeIcons[typeName as TypeName]}
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
