import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

//when I put the below in package.json, its breaks all the tests with below error
// "setupTestFrameworkScriptFile": "<rootDir>/test_setup.js",
// Error:  Cannot find module 'react-dom' from 'ReactSixteenAdapter.js'
