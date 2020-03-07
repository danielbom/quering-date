declare module QueringDate {
  interface Query {
    // The 3 next attributes is used to create a reference date.
    _day?: number;
    _month?: number;
    _year?: number;

    // This 2 last attributes are exclusive, where _months has precedence.
    // They are used to create an interval, based on reference date.
    // If not specified, the interval is the last day of the month.
    _months?: number;
    _days?: number;
  }

  interface Result {
    start: Date;
    end: Date;
  }

  function processQueryDate(query: Query): Result;
}
