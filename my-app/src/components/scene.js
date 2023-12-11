import React, { useState, useEffect } from "react";
import { API_BASE_URL, MEDIA_URL } from "./apicalls";
import axios from "axios";

function Scene({ scene }) {
  const [sceneText, setSceneText] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("")

  useEffect(() => {
    setSceneText(scene.text);
  }, []);

  const update_scene_text = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .patch(API_BASE_URL + "/scene/" + scene.id + "/", {
        text: sceneText,
      })
      .then((response) => {
        alert("Scene updated sucessfuly");
        window.location.reload(false);
      });
  };



  const delete_scene_image = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .delete(API_BASE_URL + "/scene_image/" + scene.scene_image.id + "/")
      .then((response) => {
        alert("Scene Image deleteds sucessfuly");
        window.location.reload(false);
      });
  };

  const change_scene_image = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    let url = API_BASE_URL + "/change_image/?scene_id=" + scene.id
    if (scene.scene_image.id){
      url = url+"&scene_image="+scene.scene_image.id

    }
    setLoading(true);
    axios
      .post(url, formData)
      .then((response) => {
        alert("Scene Image Changed sucessfuly");
        window.location.reload(false);
      });
  };




  const generate_scene_text = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .patch(API_BASE_URL + "/scene/" + scene.id + "/generate/", {
        text: sceneText,
      })
      .then((response) => {
        alert("Scene updated sucessfuly");
        window.location.reload(false);
      });
  };

  return (
    <div className="container">
      <div className="side audio">
        <audio controls className="aud" key={scene.text}>
          <source src={MEDIA_URL + scene.file} type="audio/mpeg" />
        </audio>

        <textarea
          className="scenetxt"
          value={sceneText}
          onChange={(e) => setSceneText(e.target.value)}
        />
        {!loading ? (
          <div className="audio_butts">
            <button className="btt btn-submit" onClick={update_scene_text}>
              Update
            </button>
            <button className="btt btn-submit" onClick={generate_scene_text}>
              Regenerate
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div class="side text">
        <div class="text-content">
          <img
            src={MEDIA_URL + scene.scene_image.file}
            className="sceneimage"
          ></img>
          <input type="file" onChange={(e) =>(setFile(e.target.files[0]))}></input>
          <div className="scene_image_btn">
            <button className="btt btn-submit" onClick={change_scene_image}>Change</button>
            <button className="btt btn-submit" onClick={delete_scene_image}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scene;
