/**
 * Footer: A Component that handles the table footer section
 * Footer component contains paginate First,Prev,Next and Last
 * First,Prev,Next and Last will be disabled based on the availability lines.
 * @author Senthilkumar G
 */

class TableFooter extends React.Component {
    render() {
        const disabled = (this.props.data.paginate.page===1) || (this.props.data.paginate.page===this.props.data.paginate.pages)
        return (
            React.createElement("tfoot", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: this.props.data.columns.length}, 
                        React.createElement("div", {className: "btn-group btn-group-justified"}, 
                            React.createElement(Button,
                                                {
                                                    text: " << ",
                                                    onClick: this.props.onFirst,
                                                    disabled: this.props.data.paginate.page===1
                                                }), 
                            React.createElement(Button,
                                                {
                                                    text: " < ",
                                                    onClick: this.props.onPrev,
                                                    disabled: this.props.data.paginate.page===1
                                                }), 
                            React.createElement(Button,
                                                {
                                                    text: " > ",
                                                    onClick: this.props.onNext,
                                                    disabled: this.props.data.paginate.page===this.props.data.paginate.pages
                                                }), 
                            React.createElement(Button,
                                                {
                                                    text: " >> ",
                                                    onClick: this.props.onLast,
                                                    disabled: this.props.data.paginate.page===this.props.data.paginate.pages
                                                })
                        )
                    )
                )
            )
        );
    }
}