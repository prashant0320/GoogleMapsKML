class Filter {
  constructor(list, elementId) {
    this.list = list;
    this.$element = $(elementId);
    this.template =
      `<div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" aria-haspopup="true" aria-expanded="true" (click)="open()">
          <span class="label"></label>
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <input type="text">
            <img class="search-icon" src="search-icon.png">
          </li>
          <ul class="items"></ul>
        </ul>
      </div>`;
    this.$filter = $(this.template).appendTo(this.$element);
    this.$button = this.$filter.find("button");
    this.$label = this.$filter.find(".label");
    this.$input = this.$filter.find("input");
    this.$items = this.$filter.find(".items");

    //bind events
    this.$input.keyup(() => {
      this.update();
    });
    this.$button.click(() => {
      this.open();
    });
    $(document).click((event) => {
      this.close(event);
    });
  }

  init() {
    //listen for changes on object, and update
    this.list.object.on('changed', () => {
      this.list.object.getLayout().then((layout) => {
        this.layout = layout;
        this.update();
      });
    });
    //call update manually on init to populate dropdown
    this.list.object.getLayout().then((layout) => {
      this.layout = layout;
      this.update();
    });
  }

  update() {
    let matrix = this.layout.qListObject.qDataPages[0].qMatrix;
    
    //update label
    let title = this.layout.qListObject.qDimensionInfo.qFallbackTitle;
    let selected = matrix.filter((row) => {
      return row[0].qState === "S";
    });
    let label = selected.length === 0 ? title : selected.length === 1 ? selected[0][0].qText : `${selected.length} ${title} selected`;
    this.$label.html(label);

    //update items
    this.$items.empty();
    matrix.filter((row) => { return row[0].qText.toLowerCase().indexOf(this.$input.val().toLowerCase()) != -1 }).forEach((row) => {
      let item = 
        `<li class=${row[0].qState}>
          <span>${row[0].qText}</span>
        </li>`;
      let $item = $(item).appendTo(this.$items);
      $item.click(() => {
        this.toggleSelection(row);
      });
    });
  }

  open() {
    this.$filter.toggleClass("show");
  }

  close(event) {
    if(!this.$element.has(event.target).length) {
      this.$items.scrollTop(0);
      this.$filter.removeClass("show");
    }
  }

  toggleSelection(row) {
    this.list.object.selectListObjectValues("/qListObjectDef", [row[0].qElemNumber], true );
  }
}

export default Filter;