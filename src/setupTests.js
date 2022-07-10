import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
// noinspection ES6UnusedImports (Required to waitFor async events in tests)
import MutationObserver from "mutationobserver-shim";

configure({adapter: new Adapter()});
