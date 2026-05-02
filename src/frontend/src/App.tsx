import { Layout } from "@/components/Layout";
import AIMentorChatPage from "@/pages/AIMentorChatPage";
import ExploreExamsPage from "@/pages/ExploreExamsPage";
import ExploreFeaturesPage from "@/pages/ExploreFeaturesPage";
import FreeTrialPage from "@/pages/FreeTrialPage";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Outlet />
      </Layout>
    </QueryClientProvider>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explore-exams",
  component: ExploreExamsPage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInPage,
});

const freeTrialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/free-trial",
  component: FreeTrialPage,
});

const exploreFeaturesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explore-features",
  component: ExploreFeaturesPage,
});

const aiMentorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-mentor",
  component: AIMentorChatPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  exploreRoute,
  signInRoute,
  freeTrialRoute,
  exploreFeaturesRoute,
  aiMentorRoute,
]);
const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
