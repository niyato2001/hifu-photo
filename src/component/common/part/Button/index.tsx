export interface ButtonProps {
  // onClick: () => void;
  type: 'btn-inquery' | 'btn-file';
  name: string;
}

export const baseId = 'common-part-button';

export const Button: React.FC<ButtonProps> = ({
  // onClick,
  type,
  name,
}) => (
  <button
    data-testid={baseId}
    // onClick={onClick}
    className={`${type} btn`}
  >
    {name}
  </button>
);
