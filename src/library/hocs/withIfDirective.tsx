import React from 'react';

interface HocProps  {
  if: boolean;
}

export function withIfDirective<Props>(WrappedComponent: React.ComponentType<Props>) {
    
    return function(props: HocProps & Props) {
      const { if: shouldRender, ...componentProps } = props;

      return shouldRender 
        ? <WrappedComponent {...componentProps as any} /> 
        : <React.Fragment />
    }
}