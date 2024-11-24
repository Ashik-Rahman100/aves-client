import { TQueryParam, TResponseRedux } from "../../../types";
import { TProperty } from "../../../types/propertyManagementType";

import { baseApi } from "../../api/baseApi";

const propertyManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/properties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProperty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addProperty: builder.mutation({
      query: (data) => ({
        url: "/properties/create-property",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddPropertyMutation, useGetAllPropertyQuery } =
  propertyManagementApi;
