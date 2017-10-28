/**
 * PageStatus: A Component that handles to show page status
 * Display current page number
 * Display Total number of page
 * @author Senthilkumar G
 */

class PageStatus extends React.Component {

    render() {
        return (
            React.createElement("div", { className: "col-md-6" },
                React.createElement("span", {
                    className: "",
                    style: {
                        textAlign: 'left',
                        color: '#26a1ae'
                    }
                }, "Page ", this.props.data.paginate.page, " of ", this.props.data.paginate.pages)
            )
        );
    }
}