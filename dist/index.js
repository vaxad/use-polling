"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollingProvider = void 0;
var react_1 = __importStar(require("react"));
var PollingContext = (0, react_1.createContext)(undefined);
var PollingProvider = function (_a) {
    var children = _a.children;
    var pollingRequestsRef = (0, react_1.useRef)(new Map());
    var stopPolling = (0, react_1.useCallback)(function (pollingKey) {
        var intervalId = pollingRequestsRef.current.get(pollingKey);
        if (intervalId) {
            clearInterval(intervalId);
            pollingRequestsRef.current.delete(pollingKey);
        }
    }, []);
    var poll = (0, react_1.useCallback)(function (_a) {
        var url = _a.url, pollingKey = _a.pollingKey, callback = _a.callback, _b = _a.delay, delay = _b === void 0 ? 2000 : _b, _c = _a.persist, persist = _c === void 0 ? true : _c, reqOptions = _a.reqOptions;
        if (pollingRequestsRef.current.has(pollingKey)) {
            return;
        }
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url, reqOptions)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        data = _a.sent();
                        callback(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Polling error for ".concat(pollingKey, ": ").concat(error_1));
                        if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.statusCode) === 404) {
                            stopPolling(pollingKey);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
        var intervalId = setInterval(fetchData, delay);
        pollingRequestsRef.current.set(pollingKey, intervalId);
        if (!persist) {
            return function () {
                clearInterval(intervalId);
                pollingRequestsRef.current.delete(pollingKey);
            };
        }
    }, [stopPolling]);
    (0, react_1.useEffect)(function () {
        return function () {
            pollingRequestsRef.current.forEach(function (intervalId) { return clearInterval(intervalId); });
            pollingRequestsRef.current.clear();
        };
    }, []);
    return (react_1.default.createElement(PollingContext.Provider, { value: { poll: poll, stopPolling: stopPolling } }, children));
};
exports.PollingProvider = PollingProvider;
var usePolling = function () {
    var context = (0, react_1.useContext)(PollingContext);
    if (!context) {
        throw new Error('usePolling must be used within a PollingProvider');
    }
    return context;
};
exports.default = usePolling;