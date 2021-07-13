import React, { useContext } from 'react';
import { Pagination } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  handlePageChange: () => void;
}

const PaginationImport: React.FC<IProps> = ({ handlePageChange }) => {
  const rootStore = useContext(RootStoreContext);
  const { setPages, page, totalPages } = rootStore.importStore;

  return (
    <Pagination
      defaultActivePage={page}
      totalPages={totalPages}
      onPageChange={(e, { activePage }) => {
        setPages(parseInt(activePage!.toString()));
        handlePageChange();
      }}
    />
  );
};
export default observer(PaginationImport);
