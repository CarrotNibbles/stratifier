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

type Effect = {
  id: EnsureSubType<`status-${string}`, string>
  type: 'enhancement' | 'enfeeblement'
  dispellable: boolean
}

type Position = {
  x: number
  y: number
  heading?: number // TODO: 0~360으로 제한해 정의하기, 사실 필요 없을땐 안정의한 뒤에 path에 의존하게 보이면 될듯
}
type Zone = (position: Position) => boolean

type Path = (frame: number) => Position

type State = {
  of: Duty['id']

  frame: number

  zone: Zone
  
  activeEntities: Entity['id'][]

  paths: { eid: Entity['id'], path: Path }[]
  gainedEffects: { eid: Entity['id'], sid: Effect['id'] }[]
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

  startFrame: number
  endFrame: number
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

// 정리용
// Duty: 하나의 보스(ex. 연영 1층 같은거)
// Challenge: 하나의 페이즈(ex. 2페이즈 3페이즈 등등)