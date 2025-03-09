import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from 'antd';

interface UseSWRMutationFetcherProps<T> {
  key: string | [string, AxiosRequestConfig?];
  swrOptions?: SWRMutationConfiguration<T, any> | any;
  axiosOptions?: AxiosRequestConfig;
  allRes?: boolean;
}

export function useSWRMutationFetcher<T>({
  key,
  swrOptions,
  axiosOptions,
  allRes = false,
}: UseSWRMutationFetcherProps<T> ) {
  return useSWRMutation<T>(
    key,
    async (key: string | [string, AxiosRequestConfig?], { arg: triggerArgs }: { arg: AxiosRequestConfig }) => {
      const url = Array.isArray(key) ? key[0] : key;
      const additionalConfig = Array.isArray(key) && key[1] ? key[1] : {};
      const axiosConfig: AxiosRequestConfig = {
        url,
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        ...additionalConfig,
        ...axiosOptions,
        ...triggerArgs,
      };
      const response: AxiosResponse = await axios(axiosConfig);
      return allRes ? response : response.data;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: (err: AxiosError, key: string, config: Readonly<SWRMutationConfiguration<T, any>>) => {
        notification['error']({
          message: (err?.response?.data as { error: string }).error ?? 'Error!',
          description: (err?.response?.data as { message: string }).message ?? "Something went wrong!",
        });
      },
      ...swrOptions,
    }
  );
}
