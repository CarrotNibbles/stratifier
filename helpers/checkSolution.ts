const checkStateConnection = (
  firstState: State,
  secondState: State
): boolean => {
  if (firstState.endFrame !== secondState.startFrame) {
    new Error(`State ${firstState} and ${secondState} are not connected!`);
  }
  firstState.activeEntities.forEach((entityId) => {
    if (!secondState.activeEntities.includes(entityId)) throw Error(`Entity ${entityId} is missing from the state ${secondState}!`);
    const firstPath = firstState.paths.find((path) => path.eid === entityId);
    const secondPath = secondState.paths.find((path) => path.eid === entityId);
    if (!firstPath) throw Error(`Entity ${entityId} doesn't have path at the state ${firstState}!`);
    if (!secondPath) throw Error(`Entity ${entityId} doesn't have path at the state ${secondState}!`);
    if (firstPath?.path(firstState.endFrame) !== secondPath?.path(secondState.startFrame)) {
      throw Error(`Entity ${entityId} doesn't have the same path at the state ${firstState} and ${secondState}!`);
      //요기서 return false 어떻게함??
    }
  });
  return true
};
