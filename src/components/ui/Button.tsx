import React from 'react';
import { ArrowUpRight } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  sublabel?: string;
  color: string;
  href?: string;
  showArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  sublabel,
  color,
  href,
  className = '',
  showArrow = true,
  type,
  disabled,
  ...rest
}) => {
  const content = <><span>{label}</span>{sublabel && <span className="text-sm">{sublabel}</span>}{showArrow && <ArrowUpRight size={18} aria-hidden="true" />}</>;
  const classes = `site-button ${className}`;
  const style = { backgroundColor: color, color: '#fff' };
  if (href) return <a href={href} className={classes} style={style}>{content}</a>;
  return <button type={type ?? 'button'} disabled={disabled} {...rest} className={classes} style={style}>{content}</button>;
};
