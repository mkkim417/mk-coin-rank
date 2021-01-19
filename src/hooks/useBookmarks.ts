import { useState, useEffect } from 'react';
import { useToast } from 'components/ToastProvider';

interface IBookmarks {
  [key: string]: boolean;
}

export function useBookmarks(): [
  IBookmarks,
  (item: string, itemName: string) => void,
] {
  const [bookmarks, setBookmarks] = useState<IBookmarks>({});
  const toast = useToast();

  const addItem = (item: string) => {
    const nextBookmarks = { ...bookmarks, [item]: true };
    saveStateAndStorage(nextBookmarks);
  };

  const deleteItem = (item: string) => {
    let nextBookmarks = { ...bookmarks };
    delete nextBookmarks[item];
    saveStateAndStorage(nextBookmarks);
  };

  const saveStateAndStorage = (items: IBookmarks) => {
    setBookmarks(items);
    window.localStorage.setItem('bookmarks', JSON.stringify(items));
  };

  const toggleItem = (item: string, itemName: string) => {
    if (!bookmarks[item]) {
      addItem(item);
      toast.add('북마크 추가 완료', `${itemName} 북마크 추가 완료`, 'success');
    } else {
      deleteItem(item);
      toast.add('북마크 삭제 완료', `${itemName} 북마크 삭제 완료`, 'danger');
    }
  };

  useEffect(() => {
    const initialize = () => {
      const storageString = window.localStorage.getItem('bookmarks') || '{}';
      const items = JSON.parse(storageString) || [];

      setBookmarks(items);
    };

    initialize();
  }, []);

  return [bookmarks, toggleItem];
}
