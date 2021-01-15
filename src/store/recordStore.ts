import clone from '@/lib/clone';


const localStorageKeyName = 'recordList';


const recordStore = {
  //record repository
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },

  createRecord(record: RecordItem){
    const newRecord: RecordItem = clone(record); //深拷贝,先变成字符串再重新创造一个对象
    newRecord.createdTime = new Date();
    this.recordList?.push(newRecord);
    recordStore.saveRecords();
  },
};
recordStore.fetchRecords();
export default recordStore;