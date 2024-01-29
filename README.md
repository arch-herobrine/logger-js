# Logger-js
## Installation
```bash
$ npm install @arch-herobrine/logger.js
```
## Usage
```ts
import Logger from "@arch-herobrine/logger.js"

const logger = new Logger({timeZone:"UTC"});

logger.log("this is log");
// -> [ log --- 2024/01/31 16:00:00 ] this is log
```
# Class(es)
## Logger
### Constructor
```ts
new Logger(options: LoggerOptions);
```
#### options
|Parameter|Type|Optional|Default|Description|
|--|--|--|--|--|
|timeZone|String|✓|"UTC"|Time zone used for logs|
### Methods
#### .log(message?,...optionalParams)
Output log to console.
|Parametar|Type|Optional|Default|Description|
|--|--|--|--|--|
|message|any|✓|none|Almost the same as `console.log()`.|
|optionalParams|any|✓|none|Almost the same as `console.log()`.|
#### .info(message?,...optionalParams)
Output info log to console.
|Parametar|Type|Optional|Default|Description|
|--|--|--|--|--|
|message|any|✓|none|Almost the same as `console.log()`.|
|optionalParams|any|✓|none|Almost the same as `console.log()`.|
#### .warn(message?,...optionalParams)
Output warn log to console.
|Parametar|Type|optional|Default|Description|
|--|--|--|--|--|
|message|any|✓|none|Almost the same as `console.warn()`.|
|optionalParams|any|✓|none|Almost the same as `console.warn()`.|
#### .error(message?,...optionalParams)
Output error log to console.
|Parametar|Type|Optional|Default|Description|
|--|--|--|--|--|
|message|any|✓|none|Almost the same as `console.error()`.|
|optionalParams|any|✓|none|Almost the same as `console.error()`.|
### Events
#### log
Emitted whenever the function `Logger.log()` is executed.
|Parameter|Type|Description|
|--|--|--|
|args|string|String output to console.|
#### infoLog
Emitted whenever the function `Logger.info()` is executed.
|Parameter|Type|Description|
|--|--|--|
|args|string|String output to console.|
#### warnLog
Emitted whenever the function `Logger.warn()` is executed.
|Parameter|Type|Description|
|--|--|--|
|args|string|String output to console.|
#### errorLog
Emitted whenever the function `Logger.error()` is executed.
|Parameter|Type|Description|
|--|--|--|
|args|string|String output to console.|