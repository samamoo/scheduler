import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [stack, setStack] = useState([initial]);

  const transition = function(mode, replace) {
    const newStack = [...stack];
    if (replace) {
      newStack.pop();
    }
    newStack.push(mode);
    setStack(newStack)
    setMode(mode)
  }
  const back = function() {
    if (stack.length < 2) {
      return;
    }
    
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack)
    setMode(newStack[newStack.length-1])
  }
  return { mode, transition, back };
}
