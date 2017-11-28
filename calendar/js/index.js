'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//based on https://www.codementor.io/reactjs/tutorial/building-a-calendar-using-react-js--less-css-and-font-awesome

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      month: moment(),
      selected: moment().startOf('day')
    };

    _this.previous = _this.previous.bind(_this);
    _this.next = _this.next.bind(_this);
    return _this;
  }

  Calendar.prototype.previous = function previous() {
    var month = this.state.month;

    this.setState({
      month: month.subtract(1, 'month')
    });
  };

  Calendar.prototype.next = function next() {
    var month = this.state.month;

    this.setState({
      month: month.add(1, 'month')
    });
  };

  Calendar.prototype.select = function select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone()
    });
  };

  Calendar.prototype.renderWeeks = function renderWeeks() {
    var _this2 = this;

    var weeks = [];
    var done = false;
    var date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday");
    var count = 0;
    var monthIndex = date.month();

    var _state = this.state;
    var selected = _state.selected;
    var month = _state.month;

    while (!done) {
      weeks.push(React.createElement(Week, { key: date,
        date: date.clone(),
        month: month,
        select: function select(day) {
          return _this2.select(day);
        },
        selected: selected }));

      date.add(1, "w");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  Calendar.prototype.renderMonthLabel = function renderMonthLabel() {
    var month = this.state.month;

    return React.createElement(
      'span',
      { className: 'month-label' },
      month.format("MMMM YYYY")
    );
  };

  Calendar.prototype.render = function render() {
    return React.createElement(
      'section',
      { className: 'calendar' },
      React.createElement(
        'header',
        { className: 'header' },
        React.createElement(
          'div',
          { className: 'month-display row' },
          React.createElement('i', { className: 'arrow fa fa-angle-left', onClick: this.previous }),
          this.renderMonthLabel(),
          React.createElement('i', { className: 'arrow fa fa-angle-right', onClick: this.next })
        ),
        React.createElement(DayNames, null)
      ),
      this.renderWeeks()
    );
  };

  return Calendar;
}(React.Component);

var DayNames = function (_React$Component2) {
  _inherits(DayNames, _React$Component2);

  function DayNames() {
    _classCallCheck(this, DayNames);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  DayNames.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'row day-names' },
      React.createElement(
        'span',
        { className: 'day' },
        'Sun'
      ),
      React.createElement(
        'span',
        { className: 'day' },
        'Mon'
      ),
      React.createElement(
        'span',
        { className: 'day' },
        'Tue'
      ),
      React.createElement(
        'span',
        { className: 'day' },
        'Wed'
      ),
      React.createElement(
        'span',
        { className: 'day' },
        'Thu'
      ),
      React.createElement(
        'span',
        { className: 'day' },
        'Fri'
      ),
      React.createElement(
        'span',
        { className: 'day' },
        'Sat'
      )
    );
  };

  return DayNames;
}(React.Component);

var Week = function (_React$Component3) {
  _inherits(Week, _React$Component3);

  function Week() {
    _classCallCheck(this, Week);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Week.prototype.render = function render() {
    var days = [];
    var date = this.props.date;
    var _props = this.props;
    var month = _props.month;
    var selected = _props.selected;
    var select = _props.select;

    for (var i = 0; i < 7; i++) {
      var day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date
      };
      days.push(React.createElement(Day, { day: day,
        selected: selected,
        select: select }));

      date = date.clone();
      date.add(1, "day");
    }

    return React.createElement(
      'div',
      { className: 'row week', key: days[0] },
      days
    );
  };

  return Week;
}(React.Component);

var Day = function (_React$Component4) {
  _inherits(Day, _React$Component4);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Day.prototype.render = function render() {
    var _props2 = this.props;
    var day = _props2.day;
    var _props2$day = _props2.day;
    var date = _props2$day.date;
    var isCurrentMonth = _props2$day.isCurrentMonth;
    var isToday = _props2$day.isToday;
    var number = _props2$day.number;
    var select = _props2.select;
    var selected = _props2.selected;

    return React.createElement(
      'span',
      {
        key: date.toString(),
        className: "day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : ""),
        onClick: function onClick() {
          return select(day);
        } },
      number
    );
  };

  return Day;
}(React.Component);

ReactDOM.render(React.createElement(Calendar, null), document.getElementById('app'));