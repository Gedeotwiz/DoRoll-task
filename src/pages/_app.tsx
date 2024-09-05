import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "@/components/redux/store/store";
import theme from '../components/util/themeConfig';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";



export default function App({ Component, pageProps }: AppProps) {
   const [queryClient] = useState(() => new QueryClient());

  return (
   <QueryClientProvider client={queryClient}>

     <Provider store={store}>
         <ConfigProvider theme={theme}>
             <Component {...pageProps} />
          </ConfigProvider>
     </Provider>
     </QueryClientProvider>

    
  );
}
