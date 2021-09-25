type TodoEquip = {
  type: "equip";
  content: string;
};
type TodoAction = {
  type: "action";
  content: string;
  notes?: string;
  eid?: number;
};
type TodoMove = {
  type: "move";
  content: string;
  notes?: string;
};
type TodoPic = {
  type: "pic";
  pid: number;
};
type TodoCoin = {
  type: "coin";
  cid: number;
};

type TodoTypes = TodoAction | TodoCoin | TodoEquip | TodoMove | TodoPic;

export type Data = {
  id: number;
  split: string;
  todo: TodoTypes[];
};
