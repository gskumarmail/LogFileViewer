/**
 * Table: A Component that handles to create Table and logviewer functionality
 * This components contains child components like header,body,footer,buttons and buttonAddons
 * Loading data from API and sending to UI
 * Handling pagination for First,Prev,Next and Last
 * Validate file extention and return error if invalid
 * @author Senthilkumar G
 */

const FILE_PATH = '../logfiles/';
const ERR_MSG = 'Log file path / name is required, e.g. log.txt';
const ERR_MSG_INVALID = 'Log file must be an extention with .txt or .log!. e.g. log.txt'

class Table extends React.Component {

    /*
     * Constructor - Initializing default States and Props
     */
    constructor(props) {
        super(props);
        this.state = {
            loader: 0,
            data: {
                columns: [],
                items: [],
                paginate: {
                    page: 1,
                    pages: 1,
                    offset: 0,
                    row_count: 10,
                    total: 0,
                    file_path: 'log.txt'
                }
            }
        };

    }

    /*
     * getloadData - Handles ajax calls to sending HTTP request
     * Return response data and paginate
     * handle loader if response getting delayed
     */
    getloadData = () => {
        this.setState({ loader: 1 });
        $.ajax({
            url: this.props.url,
            data: {
                page: this.state.data.paginate.page,
                row_count: this.state.data.paginate.row_count,
                file_path: FILE_PATH + this.state.data.paginate.file_path
            },
            dataType: "json",
            success: function(data) {
                this.setState({ paginate: data.paginate });
                this.setState({ data: data });
            }.bind(this),
            complete: function() {
                this.setState({ loader: 0 });
            }.bind(this),
            error: function(xhr, status, err) {}.bind(this)
        });
    }

    /*
     * componentDidMount - React in-build life cycle used to Initializing function after rendering 
     * getloadData used to fetch data after rendering component
     */
    componentDidMount() {
        this.getloadData();
    }

    /*
     * handleFileValidation - Handles validatating files from the user 
     * if the file does not contain extension like .txt or log will throw an error
     */
    handleFileValidation = (fileName) => {
        let errors = '';
        if (!fileName) {
            errors = ERR_MSG;
        } else if (!fileName.endsWith('.txt') && !fileName.endsWith('.log')) {
            errors = ERR_MSG_INVALID;
        }
        return errors;
    }

    /*
     * handleAnswerSelected - Handles to get files name /path from the user 
     * if the file does not contain extension like .txt or log will throw an error
     * If file is valid means get loading data
     */
    handleAnswerSelected = (filePath) => {
        const errMessage = this.handleFileValidation(filePath);
        if (errMessage) {
            return errMessage;
        } else {
            this.setState({
                paginate: $.extend(this.state.paginate, {
                    page: 1,
                    file_path: filePath
                })
            });
            this.getloadData();
        }

    }

    /*
     * goFirstPage - Handles to go first page
     * get Loading data for first page
     */
    goFirstPage = () => {
        this.setState({
            paginate: $.extend(this.state.paginate, {
                page: 1
            })
        });
        this.getloadData();
    }

    /*
     * goFirstPage - Handles to go Prev page
     * get Loading data for Prev page
     */
    goPrevPage = () => {
        this.setState({
            paginate: $.extend(this.state.paginate, {
                page: this.state.paginate.page - 1
            })
        });
        this.getloadData();
    }

    /*
     * goNextPage - Handles to go Next page
     * get Loading data for Next page
     */
    goNextPage = (e) => {
        if (this.state.paginate.page === this.state.paginate.pages) {
            e.preventDefault();
        } else {
            this.setState({
                paginate: $.extend(this.state.paginate, {
                    page: this.state.paginate.page + 1
                })
            });
            this.getloadData();
        }
    }

    /*
     * goLastPage - Handles to go Last page
     * get Loading data for Last page
     */
    goLastPage = (e) => {
        if (this.state.paginate.page === this.state.paginate.pages) {
            e.preventDefault();
        } else {
            this.setState({
                paginate: $.extend(this.state.paginate, {
                    page: this.state.paginate.pages
                })
            });
            this.getloadData();
        }
    }

    /*
     * getChangeRowCount - Handles to change total number of lines per page, default is 10 line
     * get Loading data after chnaging row count
     */
    getChangeRowCount = (e) => {
        var el = e.target;
        this.setState({
            paginate: $.extend(this.state.paginate, {
                row_count: el.options[el.selectedIndex].value
            })
        });
        this.getloadData();
    }

    render() {
        const loaderBox = (this.state.loader === 1) ? React.createElement("div", { className: "loader" }) : '';
        return (
            React.createElement("div", { className: "container" },
                loaderBox,
                React.createElement("div", { className: "button-addons" },
                    React.createElement(ButtonAddons, { onView: this.handleAnswerSelected }),
                    React.createElement("div", { className: "well" },
                        React.createElement("div", { className: "row" },
                            React.createElement(PageStatus, { data: this.state.data }),
                            React.createElement(PageOptions, { onChange: this.getChangeRowCount }),
                        )
                    ),
                    React.createElement("table", { className: "table table-bordered" },
                        React.createElement(TableHeader, { data: this.state.data }),
                        React.createElement(TableBody, { data: this.state.data }),
                        React.createElement(TableFooter, {
                            data: this.state.data,
                            onFirst: this.goFirstPage,
                            onPrev: this.goPrevPage,
                            onNext: this.goNextPage,
                            onLast: this.goLastPage,
                            onChange: this.getChangeRowCount
                        })
                    )

                )
            )
        );
    }
}

ReactDOM.render( <
    Table url = "php/log_viewer_api.php" / > ,
    document.getElementById("app")
);