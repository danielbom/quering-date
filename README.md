# Quering date

Parse date values to return a interval, to be used in queries with dates.

# Basic usage

```javascript
const MyModel = require("path/to/model/MyModel");
const processQueryDate = require("../../lib/process-query-date");

async function index(req, res) {
  try {
    const aggregation = [];

    if (req.query._date || req.query._month || req.query._year) {
      const { start, end } = processQueryDate(req.query);
      aggregation.push({
        date: {
          $gte: start,
          $lte: end
        }
      });
    }

    const entities = await MyModel.aggregate(aggregation);

    return res.status(200).json(entities);
  } catch (e) {
    return res.status(500).json({
      error: e.toString(),
      message: e.message,
      stack: e.stack
    });
  }
}
```
