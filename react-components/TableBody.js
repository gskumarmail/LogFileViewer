/**
 * TableBody: A Component that handles to create table body <tbody>
 * Helps to create tobody element
 * @Return table rows by using child component TableRow
 * @author Senthilkumar G
 */

class TableBody extends React.Component {

    render() {
        var that = this;
        return (
            React.createElement("tbody", null, 
            this.props.data.items.map(function(item, i) {
                return React.createElement(TableRow, 
                                            {
                                                key: i,
                                                item: item,
                                                columns: that.props.data.columns
                                            })
            })
            )
        );
    }
}

/**
 * TableRow: A Component that handles to create table rows <tr>
 * Helps to create <tr> element
 * @Return rows
 */
class TableRow extends React.Component {
    render() {
        var that = this;
        return (
            React.createElement("tr", null, 
            this.props.columns.map(function (column, i) {
                return React.createElement(TableCell, 
                                            {
                                                key: i,
                                                column: column,
                                                value: that.props.item[column.key]
                                            })
            })
            )
        );
    }
}

/**
 * TableCell: A Component that handles to create table cells <td>
 * Helps to create <td> element
 * @Return <td>
 */
class TableCell extends React.Component {
    render() {
        const td_textAlign = (this.props.column.key === 'No') ? 'center' : 'left';
        return (
            React.createElement("td", {className: "", style:{textAlign:td_textAlign}},
                React.createElement("pre",null, this.props.value)
            )
        );
    }
}
