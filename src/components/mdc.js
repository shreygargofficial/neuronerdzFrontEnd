import React from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

export default class mdc extends React.Component {
  state = {value: 'Woof'};

  render() {
    return (
      <div>
        <TextField
          label='Dog'
          helperText={<HelperText>Help Me!</HelperText>}
          onTrailingIconSelect={() => this.setState({value: ''})}
          trailingIcon={<MaterialIcon role="button" icon="delete"/>}
        ><Input
           value={this.state.value}
           onChange={(e) => this.setState({value: e.currentTarget.value})} />
        </TextField>
      </div>
    );
  }
}