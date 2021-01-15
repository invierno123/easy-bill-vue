type RecordItem = {
  tags: string[];
  types: string;
  notes: string;
  amount: number;
  createdTime?: Date;//类/构造函数,?表示created可以不存在

}

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicate';//联合类型
  save: () => void;
  remove: (id: string) => boolean;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicate';
}
interface Window {
  tagList: Tag[];
}