import { createApiInstance } from '..';
import { Customer } from '../../types';

import { customersApiEndpoints } from '.';

interface CustomersAPIServiceProps {
  getCustomers: () => Promise<Customer[]>;
}

type GetCustomersResponseData = { customers: Customer[] };

export const customersApi = createApiInstance({});

export const CustomersAPIService: CustomersAPIServiceProps = {
  getCustomers: async () => {
    const response = await customersApi.get<GetCustomersResponseData>(
      customersApiEndpoints.getCustomers,
    );
    return response.data.customers;
  },
  // Add other customers api here
};
