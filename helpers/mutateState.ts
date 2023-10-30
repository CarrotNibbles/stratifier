const editZone = (state: State, zone: Zone): State => {
  return {
    ...state,
    zone,
  }
}

const getDutyById = (dutyId: Duty['id'], duties:Duty[]): Duty => {
  const duty = duties.find((duty) => duty.id === dutyId);
  if (!duty) throw new Error(`Duty ${dutyId} not found!`);
  return duty;
}

const activateEntity = (state: State, eid: Entity['id']): State => {
  if (state.activeEntities.includes(eid)) {
    throw new Error(`Entity ${eid} is already active!`);
  }
  const duty = getDutyById(state.of, []);
  const entity = duty.entities.find((entity) => entity.id === eid);
  if (!entity) throw new Error(`Entity ${eid} not found!`);

  return {
    ...state,
    activeEntities: [...state.activeEntities, eid],
  }
}

const deactivateEntity = (state: State, eid: Entity['id']): State => {
  if (!state.activeEntities.includes(eid)) {
    throw new Error(`Entity ${eid} is already inactive!`);
  }
  return {
    ...state,
    activeEntities: state.activeEntities.filter((activeEid) => activeEid !== eid),
  }
}

const addPath = (state: State, eid: Entity['id'], path: Path): State => {
  const duty = getDutyById(state.of, []);
  const entity = duty.entities.find((entity) => entity.id === eid);
  if (!entity) throw new Error(`Entity ${eid} not found!`);

  return {
    ...state,
    paths: [...state.paths, { eid, path }],
  }
}

const mutatePath = (state: State, eid: Entity['id'], path: Path): State => {
  const duty = getDutyById(state.of, []);
  const entity = duty.entities.find((entity) => entity.id === eid);
  if (!entity) throw new Error(`Entity ${eid} not found!`);
  const entityPath = state.paths.find((path) => path.eid === eid);
  if (!entityPath) throw new Error(`Entity ${eid} doesn't have path!`);

  return {
    ...state,
    paths: state.paths.map((defaultPath) => defaultPath.eid === eid ? defaultPath : { eid, path: path}),
  }
}

const addEffect = (state: State, eid: Entity['id'], sid: Effect['id']): State => {
  const duty = getDutyById(state.of, []);
  const entity = duty.entities.find((entity) => entity.id === eid);
  if (!entity) throw new Error(`Entity ${eid} not found!`);
  const effect = duty.effects.find((effect) => effect.id === sid);
  if (!effect) throw new Error(`Effect ${sid} not found!`);

  return {
    ...state,
    gainedEffects: [...state.gainedEffects, { eid, sid }],
  }
}

const deleteEffect = (state: State, eid: Entity['id'], sid: Effect['id']): State => {
  return {
    ...state,
    gainedEffects: state.gainedEffects.filter((gainedEffect) => gainedEffect.eid !== eid || gainedEffect.sid !== sid),
  }
}