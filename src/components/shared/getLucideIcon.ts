import * as Icons from 'lucide-react';
import type { ComponentType } from 'react';

export function getLucideIcon(name: string, fallback: ComponentType = Icons.Box): ComponentType {
  return (Icons as Record<string, ComponentType>)[name] ?? fallback;
}
