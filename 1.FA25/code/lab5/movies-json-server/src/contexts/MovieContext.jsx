import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import movieApi from '../api/movieApi';
import { movieReducer, initialMovieState } from '../reducers/movieReducer';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

const buildFilterParams = (filters) => {
  const params = {};
  if (filters.q) params.q = filters.q;
  if (filters.genreId) params.genreId = filters.genreId;
  if (filters.duration_gte) params.duration_gte = filters.duration_gte;
  if (filters.duration_lte) params.duration_lte = filters.duration_lte;
  if (filters.sort === 'title_asc') {
    params._sort = 'title';
    params._order = 'asc';
  }
  if (filters.sort === 'title_desc') {
    params._sort = 'title';
    params._order = 'desc';
  }
  return params;
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error('Lỗi khi tải danh sách thể loại:', error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const fetchMovies = useCallback(
    async (overrideFilters) => {
      dispatch({ type: 'START_LOADING' });
      const activeFilters = overrideFilters ?? state.filters;
      const params = buildFilterParams(activeFilters);

      try {
        const response = await movieApi.get('/movies', { params });
        dispatch({ type: 'SET_MOVIES', payload: response.data });
      } catch (error) {
        console.error('Lỗi khi tải danh sách phim:', error);
        dispatch({ type: 'SET_MOVIES', payload: [] });
      }
    },
    [state.filters]
  );

  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });

      try {
        await movieApi.delete(`/movies/${id}`);
      } catch (error) {
        console.error('Lỗi khi xóa phim:', error);
      } finally {
        await fetchMovies();
        dispatch({
          type: 'SHOW_TOAST',
          payload: {
            message: 'Xóa phim thành công!',
            variant: 'success'
          }
        });
      }
    },
    [fetchMovies]
  );

  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' });

      try {
        if (isEditing) {
          await movieApi.put(`/movies/${isEditingId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }

        dispatch({ type: 'RESET_FORM' });
        await fetchMovies();
        dispatch({
          type: 'SHOW_TOAST',
          payload: {
            message: isEditing ? 'Cập nhật phim thành công!' : 'Thêm phim thành công!',
            variant: 'success'
          }
        });
        return true;
      } catch (error) {
        console.error('Lỗi thao tác CREATE/UPDATE:', error);
        await fetchMovies();
        return false;
      }
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
