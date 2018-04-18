import {$Call} from 'utility-types';

import {RootState} from 'core/rootReducer';

export const mapStateToProps = (state: RootState) => ({
  pendencies: state.pendencies.data,
  userName: state.user.data.displayName,
});

export type MapStateToProps = $Call<typeof mapStateToProps>;
