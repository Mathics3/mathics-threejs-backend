import { testScreenshot } from '../jest.utils.js';

testScreenshot('Test empty scene', 'empty.html');
testScreenshot('Test "wrong protocol version" error', 'wrong_protocol_version.html');
