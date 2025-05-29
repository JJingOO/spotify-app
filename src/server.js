import express from "express";
import cors from "cors";
import { getGenre } from "./utils/getGenre.js";
import {
  getCountryTopArtists,
  getCountryTopSongs,
} from "./utils/getCountryTopSongsAndArtists.js";
import { getWeeklyGlobalData } from "./utils/getGlobalTop5.js";
import { searchArtist } from "./utils/searchArtist.js";
import { getSpotifyToken } from "./utils/getSpotifyToken.js";
import { getRelatedArtists } from "./utils/getRelatedArtists.js";
import { getArtistTopTracks } from "./utils/getArtistTopTracks.js";
import { getDailyGlobalData } from "./utils/getDailyGlobalData.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

const unofficialToken =
  "Bearer BQBWEUnnNBbMaFdZlwNOV6Kke4SoU6dFN2Lwf_FgE8QmrnRu_q504tp51L-eR9v3xjk67WraxBAaTJRdbxBzz81TRUeZxppvd3Khdc7-W-RSmXbFKvQGANipQff-M-uMP5PI_g5tnJ3avcYi2A6X4XKLfz8VSOdfHacuyp3CC1IzqV4I9ccONS8o3RRw05cEkLZpCbEufe0SGucMgFBsVoLrzPNuRyReHVpJuy7phlKcZk8X4gavjLG26YrM0B6d";

app.get("/api/countryTop5/:country", async (req, res) => {
  const countryName = req.params.country;
  const songs = await getCountryTopSongs(unofficialToken, countryName);
  const artists = await getCountryTopArtists(unofficialToken, countryName);
  const dailyResult = await getDailyGlobalData(unofficialToken, countryName);

  const result = { weeklyResult:{songs,artists},dailyResult };
  res.json(result);
});

app.get("/api/global-data", async (req, res) => {
  const weeklyResult = await getWeeklyGlobalData();
  const dailyResult = await getDailyGlobalData(unofficialToken, "global");
  
  const result = { weeklyResult, dailyResult };

  res.json(result);
});

app.post("/api/get-genre", async (req, res) => {
  const globalData = req.body;
  const token = await getSpotifyToken();

  const result = await getGenre(globalData, token);
  res.json(result);
});

app.get("/api/search-artist/:query", async (req, res) => {
  const query = req.params.query;

  const token = await getSpotifyToken();
  const artist = await searchArtist(query, token);
  const relatedArtist = await getRelatedArtists(artist.genres[0], token);
  const tracks = await getArtistTopTracks(artist.id, token);

  res.json({ artist, relatedArtist: relatedArtist, tracks: tracks });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
