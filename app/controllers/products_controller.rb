class ProductsController < ApplicationController
  # GET /products
  # GET /products.xml
  def index
    @num_page = (params[:page].nil?) ? 0 : params[:page]
    @products = Product.paginate :page => @num_page
    
    render :json => { :success => true, :message => "List All Products", :products => @products }
     # format.html # index.html.erb
    # format.xml  { render :xml => @products }    
  end

  # GET /products/1
  # GET /products/1.xml
  def show
    @product = Product.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @product }
    end
  end

  # GET /products/new
  # GET /products/new.xml
  def new
    @product = Product.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @product }
    end
  end

  # GET /products/1/edit
  def edit
    @product = Product.find(params[:id])
  end

  # POST /products
  # POST /products.xml
  def create
    # @note = Note.new()
    # @note.name = params["data"]["name"]
    # @note.content = "BITE CONTENT"
    # 
    # if @note.save
    #   render :json => { :success => true, :message => "Created new note #{@note.id}", :data => @note }
    # else
    #   render :json => { :success => false, :message => "Failed to create note"}
    # end

    
    
    @product = Product.new(params[:product])
    
    logger.debug "PPPPPPPPPP : #{params}"
    logger.debug "DDDDDDDDDDDD : #{@product}"
  
  
      if @product.save
        render :json => { :success => true, :message => "Created new product #{@product.id}", :products => @product }
        #format.html { redirect_to(@product, :notice => 'Product was successfully created.') }
        #format.xml  { render :xml => @product, :status => :created, :location => @product }
      else
        #format.html { render :action => "new" }
        #format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
        render :json => { :success => false, :message => "Failed to create product"}
      end
      
  end

  # PUT /products/1
  # PUT /products/1.xml
  def update
    @product = Product.find(params[:id])

    respond_to do |format|
      if @product.update_attributes(params[:product])
        format.html { redirect_to(@product, :notice => 'Product was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.xml
  def destroy
    @product = Product.find(params[:id])
    @product.destroy

    respond_to do |format|
      format.html { redirect_to(products_url) }
      format.xml  { head :ok }
    end
  end
end
