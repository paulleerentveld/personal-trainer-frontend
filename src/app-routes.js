import { HomePage, TasksPage, ProfilePage, ClientsPage, ExercisesPage, WorkoutsPage, ProgramsPage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    }, 
  {
    path: '/clients',
    element: ClientsPage
  }, 
  {
    path: '/exercises',
    element: ExercisesPage
  }, 
  {
    path: '/workouts',
    element: WorkoutsPage
  }, 
  {
    path: '/programs',
    element: ProgramsPage
  }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
