import React from 'react';

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = props => {
  return <button {...props}>Increment</button>;
};

export default Button;
