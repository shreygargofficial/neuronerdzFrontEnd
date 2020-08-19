import React from 'react'
import SideNav from './sideNav'
import Axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import { IconButton,Snackbar } from '@material-ui/core/';
import url from './url'
import UpdateIcon from '@material-ui/icons/Update';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import Spinner from './Spinner';
export default class AdminCategory extends React.Component {

    state = {
        categories: [],
        error: "",
        success: "",
        successDelete: "",
        errorDelete: "",
        loading: true,
        open: false
    }
    componentDidMount() {
        Axios.get(url + 'getAllCategory').then(sucess => {
            this.setState({ categories: sucess.data.data, loading: false })
        }).catch(err => {
            if (err.response)
                this.setState({ error: err.response.data.message, success: "", loading: false })
            else
                this.setState({ error: err.message, success: "", loading: false })
        })
    }
    deleteIcon = (category) => {
        this.setState({ loading: true })
        Axios.delete(url + "deleteCategory/" + category).then(success => {
            this.setState({ successDelete: success.data.message, errorDelete: "", loading: false, open: true })
            this.componentDidMount()
        }).catch(err => {
            if (err.response)
                this.setState({ successDelete: "", errorDelete: err.response.data.message, loading: false, open: true })
            else
                this.setState({ successDelete: "", errorDelete: err.message, loading: false, open: true })
        })
    }
    handleSnackbarClose = () => {
        this.setState({ open: false })
    }
    render() {
        if (this.state.loading)
            return <Spinner />
        return (
            <React.Fragment>
                <SideNav location="category" />
                <div className="container mt-10">
                    <div className="row justify-content-center">
                        <div className="col-sm-8">
                            <h2 className="text-center mb-3">Categories</h2>
                            {this.state.categories.length ? this.state.categories.map(mainData => {
                                return (
                                    <div className="category-tab" key={mainData.category}>
                                        <div className="category_text"> {mainData.category}</div>
                                        <IconButton
                                            className="delete__icon"
                                            onClick={() => this.deleteIcon(mainData.category)}
                                        >
                                            <DeleteIcon color="primary" />
                                        </IconButton>
                                        <IconButton className="update__icon">
                                            <UpdateIcon color="primary" />
                                        </IconButton>


                                    </div>
                                )
                            }):<h1 className="text-center mt-10">No Categories</h1>}
                            <IconButton className="user__addicon" href="#">
                                <AddIcon />
                            </IconButton>
                        </div>

                    </div>
                </div>
                <Snackbar open={this.state.open} autoHideDuration={3000} >
                    <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="success">
                        {this.state.successDelete}
                    </MuiAlert>
                </Snackbar>
                {this.state.errorDelete && <Snackbar open={this.state.open} autoHideDuration={3000} >
                    <MuiAlert onClose={this.handleSnackbarClose} elevation={6} variant="filled" severity="error">
                        {this.state.errorDelete}
                    </MuiAlert>
                </Snackbar>}
            </React.Fragment>
        )
    }
}