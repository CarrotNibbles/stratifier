type EnsureSubType<T, P> = T extends P ? T : never

type RoleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type TankRole = `T${RoleNumber}`
type HealerRole = `H${RoleNumber}`
type DPSRole = `D${RoleNumber}`
type Role = TankRole | DPSRole | HealerRole

type TankJob = 'PLD' | 'WAR' | 'DRK' | 'GNB'
type PureHealerJob = 'WHM' | 'AST'
type BarrierHealerJob = 'SCH' | 'SGE'
type HealerJob = PureHealerJob | BarrierHealerJob
type MeleeDPSJob = 'MNK' | 'DRG' | 'NIN' | 'SAM' | 'RPR'
type RangedDPSJob = 'BRD' | 'MCH' | 'DNC'
type CasterDPSJob = 'BLM' | 'RDM' | 'SMN'
type DPSJob = MeleeDPSJob | RangedDPSJob | CasterDPSJob
type Job = TankJob | HealerJob | DPSJob

type Entity = {
  id: string
}

type Player = EnsureSubType<{
  id: EnsureSubType<`player-${string}`, string>
  job?: Job
  role?: Role
}, Entity>
type Party = Player[]

type Effect = EnsureSubType<{
  id: EnsureSubType<`effect-${string}`, string>
}, Entity>

type Position = {
  x: number
  y: number
}
type Zone = (position: Position) => boolean

type State = {
  of: Duty['id']

  zone: Zone
  
  activeEntities: Entity['id'][]

  positions: { eid: Entity['id'], position: Position }[]
  gainedEffects: { eid: Entity['id'], fid: Effect['id'] }[]
}

type Result = {
  success: boolean
  detail?: string
}

type Challenge = {
  id: EnsureSubType<`challenge-${string}`, string>
  
  checkSolution: (state: State, solution: Solution) => Result
  testifySolution: (state: State, solution: Solution) => Result
  
  mutateState: (state: State) => State

  next?: (state: State) => Challenge['id']
}

type Duty = {
  id: EnsureSubType<`duty-${string}`, string>
  
  name: string
  playerCount: number

  entities: Entity[]
  effects: Effect[]
  challenges: Challenge[]

  start: Challenge['id']
}

type Solution = {
  id: EnsureSubType<`solution-${string}`, string>
  target: Challenge['id']

  mutateState: (state: State) => State
}

type Strategy = {
  id: EnsureSubType<`strategy-${string}`, string>
  target: Duty['id']

  name: string

  party: Party
  solutions: Solution[]
}
