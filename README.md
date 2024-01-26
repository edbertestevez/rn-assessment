# Paack Technical Challenge

This repository serves as my submission for the technical challenge given by paack team as part of my job application as a React Native Developer.

The current setup is using the [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page) of React Native (0.73.2).

## Overview

The mobile application is a portal where restaurant orders to take away are handled.

## Requirements
Please refer to [React Native](https://github.com/facebook/react-native?tab=readme-ov-file#-requirements) guide to setup your local environment.

## Local Setup
> Assuming you have setup React Native and required emulators / physical devices already

Please use 'yarn'
1. Clone this repository 
2. Go to app directory 
    
        cd <project path>
3. Install packages using `yarn`
        
        yarn install
        
4. Run the application
   
   Start Metro
   ```
   yarn start
   ``````

   Run Android (Emulator or Physical phone)
   ```
   yarn android
   ``````

   OR 

   Run iOS (Emulator or Physical phone)
   ```
   yarn ios
   ``````
## Features

* Orders List
	* Display list of orders
	* Display confirmed earnings *(based on CLOSED orders)*
	* Display pending earnings *(based on OPEN orders)*
* Order Details
	* Display order details with customer details 
	* Prepare order
	* Close order


## Packages / Libraries

Routing
- [react-navigation](https://reactnavigation.org/)

State Management & Storage
- [mobx](https://mobx.js.org/)
- [mobx-persist-store](https://github.com/quarrant/mobx-persist-store)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

Testing
- [jest](https://jestjs.io/) - unit and integration testing
- [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) - for API mocking
- [@testing-library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [detox](https://wix.github.io/Detox/docs/introduction/project-setup/#step-1-bootstrap) - e2e testing
 
 Styling
 - [styled-components](https://styled-components.com/)

 Others
 - [axios](https://github.com/axios/axios)
 - [eslint](https://eslint.org/)
 - [prettier](https://prettier.io/)

 
## Design Patterns
### Containers Pattern
- The business logic, states, functions for each screen are defined in a `<screenName>Container.tsx` file. Specific props are then passed to the `<screenName>.tsx`file which represents the screen UI. 
- This was used to separate business logic to the presentational components which allows developers to easily apply testing on the screen component.

### Observable State Pattern (mobx)
- Allows reactive state management by automatically tracking and updating the state changes using observables and actions.
- Mobx was used due to its simplicity and flexibility in general
- mobx related files are found in the `stores` directory

![MobX Concepts](https://res.cloudinary.com/practicaldev/image/fetch/s--SUvW-FJs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/9zqUM2a.png)

### Provider Pattern
- Allows sharing of state or functions with multiple components without passing it down through props at every level.
- Typical use case are for Context API, but on the current version of the app, `ThemeProvider` of `styled-components` was used to define `theme` for the app.

## Files Directory and Naming Convention
 - **src**
	 - **api** *-  all API related files*
		 - `<moduleName>`
			 - `<moduleName>`ApiEndpoints.ts
			 - `<moduleName>`ApiService.ts
			 - mock`<moduleName>`ApiData.ts
			 - mock`<moduleName>`ApiService.ts
			 - index.ts
	 - **components** *- reusable components*
	 - **helpers** *- reusable logic and functions*
	 - 	**hooks** *- custom hooks*
	 - 	**navigation** *- app navigation related files*
		 - index.ts
		 - AppNavigator.tsx - *main app navigation*
		 - NavigationWrapper.tsx - *navigation container*
		 - routes.ts - *centralized definition of route names*
		 - types.ts
	- 	**screens**
		- `<ScreenName>`
			- `<ScreenName>`.tsx - *presentational component*
			- `<ScreenName>`Container.tsx - *business logic and state management, etc*
			- `<others>` - *component files specific to the screen*
	- **stores** * - mobx related files*
		- `<Model>`Store.tsx
	- 	**testUtils** - testing related utility files
		- index.ts
		- testIds.ts *- contains all testIDs for jest testing* 
		- testingLibraryUtils.tsx - *test wrapper with configured Providers *(import this during testing instead of the original testing-library)**
	- 	**types**
	- **App.tsx** - *main application component*
	- **config.ts** - main app configuration / constants
	- **theme.ts** - styled-components theme definition

 - **jest.setupFilesAfterEnv.ts** - contains all global mocks, API mocks for jest testing
 - **native_modules** - contains all native modules developed by the team
	 - RTN`<nativeModuleName>`/ - native module files
 
## Creating New Screens

Example: `Home` is the screen name
1. Create a new folder on `src/screens` named `Home`
2. Under `Home` directory, create 2 files named `Home.tsx` and `HomeContainer.tsx`
3. Update the files based on your requirement. Make sure that `Home.tsx` will only be a presentational component receiving props from `HomeContainer.tsx`
4. If `testID` in the components are required, first define the testID at `src/testUtils/testIds.tsx` so that our test IDs are fully managed and avoid possibility of typos during jest testing.

## Adding Screen to Navigation

> Assuming a new screen/route will be added on the existing StackNavigator only
1. Define the route name on `src/navigation/routes.ts`
2. Update `StackParamList` from `src/navigation/types.ts` and include the new route as key. Define the route parameters type as well if necessary.
3. Define your <Stack.Screen>  inside `src/navigation/AppNavigator.tsx` for the screen to be registered

## Create a new set of API and mock for testing
1. Go to `src/api` directory
2. Create a new folder (`<moduleName>`) for your api service
3. Create **`<moduleName>`ApiEndpoints.ts** file and define your api endpoints *(excluding the base url)*
	```js
	export  const  testApiEndpoints  = {
		getTest:  '/test-endpoint',
	};
	```
4. Create **`<moduleName>`ApiService.ts** file and define the functions for your api service
	```js
	import { createApiInstance } from '../config';
	import { testApiEndpoints } from '.';

	interface TestAPIServiceProps {
	  getTest: () => Promise<Order[]>;
	}

	export const testApi = createApiInstance({
		customBaseUrl: '<your custom base endpoint>'
	});

	export const TestAPIService: TestAPIServiceProps = {
	  getTest: async () => {
	    const response = await ordersApi.get(
	      testApiEndpoints.getTest,
	    );
	    return response.data;
	  },
	  // Add other orders api here
	};
	```
5. Next step would be to create a **mock`<ModuleName>`ApiService.ts** file to mock the ApiService request's during jest testing.
	```js
	import MockAdapter from 'axios-mock-adapter';

	import { testApi, testApiEndpoints } from '.';

	export const mockTestApiService = () => {
	  const mock: MockAdapter = new MockAdapter(testApi);

	  // Mock the endpoints
	  mock
	    .onGet(testApiEndpoints.getTest)
	    .reply(200, { <mocked response body here> });

	  // Define additional endpoint mocks here

	  return mock;
	};

	```
6. Create **index.ts** that exports all the files you created
	```js
	export  *  from  './testApiService';
	export  *  from  './testApiEndpoints';
	export  *  from  './mockTestApiService';
	```
7. After creating all required files, we need to make sure that our mock API is being read during jest testing so that the actual API won't be triggered.
8. Open `jest.setupFilesAfterEnv.ts` file
9. Import the `mock<ModuleName>ApiService` you created and use it inside the `beforeAll()` statement
	```js
	import { mockTestApiService } from './src/api/test';
	//...

	// Global Jest actions
	beforeAll(() => {
	  // Add API service  mocks here
	  //...other mocked api services
	  mockTestApiService();
	});
	``` 
10. Now try to create a test that calls your API endpoint and confirm in jest if the actual API or the mocked API was triggered.

## Creating a native module (Turbo Native Modules)

Please refer to the [Official Docs](https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules) for the complete step-by-step guide.

> **IMPORTANT**: During development, the KOTLIN based approach from the official docs was causing unknown errors during build. When I opted to use the JAVA approach, everything works fine right away.
- For file directory, (at least for this project), all native modules are defined under the `native_modules` directory. Module names should be prefixed with `RTN` (e.g. RTNTimer)

### Common Issues Encountered
1. IOS Build failed:
	- Try to run https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules#generate-the-code---ios
	- Then try `yarn ios` afterwards

# Testing

### Naving Convention & Directory
- The name of your test files should adhere to the original filename of the file being tested.
	- Example: 
		- Button.tsx
		- Button.test.tsx
- Also the location of the test file is together with the file being tested
	- Easier to determine which files doesn't have tests
	- Easier to navigate test file and the file being tested

### Strategy
1. Identify the components and features to be developed
2. Identify critical components (unit) and user flows of the feature to be covered with test 
3. All defined external APIs should be mocked with proper mocked endpoints implementation
4. Unit testing should be done on individual components especially if it has conditional logic
5. Integration testing should be done for individual screens covering critical logic and integrations
6. End-to-End test should cover critical user flows and end-to-end scenarios.
7. Discuss and plan out with the team the Standard and guidelines of testing for the product
8. Monitor coverage and make sure it adheres to acceptable range
9. Edge cases should be covered

### Tools Used
7. UNIT Testing --> JEST
8. INTEGRATION Testing --> JEST
9. END-TO-END Testing --> DETOX (ONGOING)

# DEMO
### ANDROID
https://github.com/edbertestevez/rn-assessment/assets/33598612/9bd16a95-0114-4665-aa70-1abc5895288d

### IOS
https://github.com/edbertestevez/rn-assessment/assets/33598612/53cda988-3b1c-422a-ad0b-13850fbfed5b



# OTHERS
### Stage 7
>How would you do it to test the calls you’ve made to the API? Or to test all the features without having to call the API?

**Response:** I used `axios-mock-adapter` to mock actual API calls. It is possible to use it as actual APIs in runtime, but for this project, I only applied it in jest to mock the entire api service and endpoints.

---

### Stage 9
>How would you configure the project to ensure that you can develop together smoothly? Is there any part of the application that you would need to improve?

**Response:**
1. Using `eslint` and `prettier` in the repository to make sure that code styling remains consistent across the team. ***(implemented during initial setup)***
2. Using `husky`and `lint-staged` to pre-commit and validate lints and tests before actual commit pushes through. If either lint or tests fails, the commit will be blocked. ***(implemented)***
3. Add `.nvmrc` file so that the team's node version is consistent  ***(implemented)***
4. Use JSDoc to document functions for clarity
5. Setup environment variables for "dev", "staging", and "prod" environments.

`Outside of the application`
- Align with the team in terms of how "branches" in the repository will be handled for different use-cases such as "features", "hotfix", etc.
- Establish code review process. Block direct push to "main" branch, and require Pull Requests with minimum number of approvals before merging.
- 
### Stage 10
>Develop a testing strategy to achieve the higher test coverage possible. Also, report the test coverage achieved.

Please see "Testing" section of this document


### Current test coverage (01/26/24)
<img width="554" alt="test-coverage" src="https://github.com/edbertestevez/rn-assessment/assets/33598612/76b45d4c-9c92-4912-a040-1f04b0123a94">

-------

### **NOTE:**
- End-to-End test using Detox is still pending. Still resolving setup but only 1 test file will be added once resolved.
  	- No additional files or file structure change. So it can be reviewed already :)
  	- Will push the end-to-end test file soon, once done
 
Thank you!
