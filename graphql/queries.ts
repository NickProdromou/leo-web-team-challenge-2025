import { gql } from '@apollo/client'

export const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
        genres
      }
    }
  }
`

export const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
        medium
        extraLarge
      }
      averageScore
      popularity
      genres
      episodes
      season
      seasonYear
      status
      format
      source
      duration
      studios {
        nodes {
          name
        }
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
    }
  }
`
