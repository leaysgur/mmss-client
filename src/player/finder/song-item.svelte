<script>
  import { formatTime } from "../utils";
  export let item;
</script>

<div class="SongItem">
  <div>{item.name}</div>
  <div class="sub">
    <div>{item.artist}</div>
    <div>
      Disc {item.disc || '-'} / Track {item.track || '-'} / {formatTime(item.duration)}
    </div>
  </div>
</div>

<style>
  .SongItem {
    box-sizing: border-box;
    margin: 2px;
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.1rem;
  }

  .SongItem .sub {
    padding-top: 5px;
    color: #b3b3b3;
    text-align: right;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
  }
</style>
