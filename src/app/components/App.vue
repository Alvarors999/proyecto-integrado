<template>
    <div>
        <nav class="navbar navbar-expand navbar-light fixed-top">
            <div class="container">
                <a href="#" class="navbar-brand">Home</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link">Login</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendSerie"> <!--.prevent para que no recargue la página-->
                                <div class="form-group">
                                    <input type="text" v-model="serie.title" placeholder="Insert a title" class="form-control">
                                </div>
                                <!-- <div class="form-group">
                                    <input type="file" @change="onFileSelected" multiple>
                                    <button @click="onUpload">Upload</button>
                                </div> -->
                                <div class="form-group">
                                    <input type="date" v-model="serie.release_date" placeholder="Insert a image" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="serie.description" cols="30" rows="10" class="form-control" placeholder="Insert a Description"></textarea>
                                </div>
                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Serie</th>
                                <th>Description</th>
                                <th>Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="serie of series">
                                <td>{{serie.title}}</td>
                                <td>{{serie.description}}</td>
                                <td>{{serie.release_date}}</td>
                                <td>
                                    <button @click="deleteSerie(serie._id)" class="btn btn-danger">
                                        Delete
                                    </button>
                                    <button @click="editSerie(serie._id)" class="btn btn-secondary">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    class Serie {
        constructor(title, description, image, release_date) {
            this.title = title;
            this.description= description;
            this.image = image;
            this.release_date = release_date;
        }
    }

    export default {
        data() {
            return {
              serie: new Serie(),
              series: [],
              edit:false,
              serieToEdit: '',
              selectedFile:null
            }
        },
        created() {
            this.getSeries();
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload() {
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name)
                axios.post('localhost/mevn-database/', fd)
                .then(res => {
                    console.log(res)
                })
            },
            sendSerie() {
               if(this.edit === false) {
                    fetch('/api/series', {
                        method: 'POST',
                        body: JSON.stringify(this.serie),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type':'application/json'
                        }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.getSeries();
                    })
               }else {
                   fetch('/api/series/' + this.serieToEdit,{
                       method: 'PUT',
                       body: JSON.stringify(this.serie),
                       headers: {
                           'Accept': 'application/json',
                           'Content-type':'application/json'
                       }
                   })
                   .then(res => res.json())
                   .then(data => {
                       this.getSeries();
                       this.edit = false;
                   });
               }

                this.serie = new Serie();
            },
            getSeries() {
                fetch('/api/series')
                .then(res => res.json())
                .then(data => {
                    this.series = data;
                    console.log(this.series)
                });
            },
            deleteSerie(id) {
                fetch('/api/series/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getSeries();
                });
            },
            editSerie(id) {
                fetch('/api/series/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.serie = new Serie(data.title, data.description, data.image, data.release_date);
                        this.serieToEdit = data._id;
                        this.edit = true
                    });
            }
        }
    }
</script>
