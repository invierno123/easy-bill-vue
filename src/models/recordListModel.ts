import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data
  },
  create(record: RecordItem){
    const newRecord: RecordItem =clone(record); //深拷贝,先变成字符串再重新创造一个对象
    newRecord.createdTime = new Date();
    this.data.push(newRecord);
    this.save();
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default recordListModel;