import { useEffect, useReducer } from 'react';
import { MantineProvider, Container, Title, Grid, Loader, Text } from '@mantine/core';
import { LaunchCard } from './components/LaunchCard';
import { LaunchModal } from './components/LaunchModal';
import { fetchLaunches } from './api/spacex';
import { launchesReducer, initialState } from './store/launchesReducer';
import '@mantine/core/styles.css';

function App() {
  const [state, dispatch] = useReducer(launchesReducer, initialState);

  useEffect(() => {
    const loadLaunches = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const launches = await fetchLaunches('2020');
        dispatch({ type: 'FETCH_SUCCESS', payload: launches });
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to fetch launches',
        });
      }
    };

    loadLaunches();
  }, []);

  const handleSeeMore = (launch: typeof state.launches[0]) => {
    dispatch({ type: 'SELECT_LAUNCH', payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="xl">
          <Title order={1} mb="xl" ta="center">
            SpaceX Launches 2020
          </Title>

          {state.loading && (
            <div className="flex justify-center items-center py-20">
              <Loader size="lg" />
            </div>
          )}

          {state.error && (
            <Text c="red" ta="center" size="lg">
              {state.error}
            </Text>
          )}

          {!state.loading && !state.error && (
            <Grid>
              {state.launches.map((launch, index) => (
                <Grid.Col key={`${launch.mission_name}-${index}`} span={{ base: 12, sm: 12, md: 4 }}>
                  <LaunchCard launch={launch} onSeeMore={handleSeeMore} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Container>

        <LaunchModal launch={state.selectedLaunch} onClose={handleCloseModal} />
      </div>
    </MantineProvider>
  );
}

export default App;
