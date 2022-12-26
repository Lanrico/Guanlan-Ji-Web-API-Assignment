// export const getMovies = (page) => {
//   return fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page.queryKey[1]}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getMovies = (page) => {
  return fetch(
    `/api/movies/tmdb/discover/page${page.queryKey[1]}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getPeople = (page) => {
//   return fetch(
//     `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page.queryKey[1]}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getPeople = (page) => {
  return fetch(
    `/api/people/tmdb/popular/page${page.queryKey[1]}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getUpcomingMovies = (page) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page.queryKey[1]}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getUpcomingMovies = (page) => {
  return fetch(
    `/api/movies/tmdb/upcoming/page${page.queryKey[1]}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getTrendingList = (args) => {
//   const [, argsQuery] = args.queryKey;
//   return fetch(
//     `https://api.themoviedb.org/3/trending/${argsQuery.type}/${argsQuery.time_window}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getTrendingList = (args) => {
  const [, argsQuery] = args.queryKey;
  return fetch(
    `/api/trending/tmdb/${argsQuery.type}/${argsQuery.time_window}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getMovie = (args) => {
//   const [, idPart] = args.queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getMovie = (id) => {
  return fetch(
    `/api/movies/tmdb/movie/${id.queryKey[1]}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getPerson = (args) => {
//   const [, idPart] = args.queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getPerson = (id) => {
  return fetch(
    `/api/people/tmdb/person/${id.queryKey[1]}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getGenres = async () => {
//   return fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
//     process.env.REACT_APP_TMDB_KEY +
//     "&language=en-US"
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getGenres = () => {
  return fetch(
    `/api/genres/tmdb`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getMovieImages = ({ queryKey }) => {
//   const [, idPart] = queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();

//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getMovieImages = (id) => {
  return fetch(
    `/api/movies/tmdb/movie/${id.queryKey[1]}/images`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getPersonImages = ({ queryKey }) => {
//   const [, idPart] = queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();

//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getPersonImages = (id) => {
  return fetch(
    `/api/people/tmdb/person/${id.queryKey[1]}/images`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getPersonMovieCredits = ({ queryKey }) => {
//   const [, idPart] = queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();

//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getPersonMovieCredits = (id) => {
  return fetch(
    `/api/people/tmdb/person/${id.queryKey[1]}/movie_credits`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getPersonExternalIds = ({ queryKey }) => {
//   const [, idPart] = queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();

//   })
//     .catch((error) => {
//       throw error
//     });
// };

export const getPersonExternalIds = (id) => {
  return fetch(
    `/api/people/tmdb/person/${id.queryKey[1]}/external_ids`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};

// export const getMovieReviews = (id) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   )
//     .then((res) => res.json())
//     .then((json) => {
//       return json.results;
//     });
// };

export const getMovieReviews = (id) => {
  return fetch(
    `/api/movies/tmdb/movie/${id}/reviews`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  }).then(res => {
    return res.json();
  }).catch((error) => {
    console.log(error);
  });
};