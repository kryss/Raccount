class OrdersController < ApplicationController

  def index
		@start = (params[:start].nil?) ? 0 : params[:start]
		@limit = (params[:limit].nil?) ? 10 : params[:limit]
		@sort = (params[:sort].nil?) ? 'id' : params[:sort]
		@dir = (params[:dir].nil?) ? 'ASC' : params[:dir]
    @orders = Order.limit(@limit).offset(@start).order(@sort + " " + @dir)
		@count = Order.count
    render :json => { :success => true, :message => "List All orders", :total => @count, :order => @orders }
  end

  def show
    @order = Order.find(params[:id])
    render :json => { :success => true, :message => "Show orders", :order => @order }
  end

  def new
    @order = Order.new

    respond_to do |format|
      format.html
      format.xml  { render :xml => @order }
    end
  end

  def edit
    @order = Order.find(params[:id])
  end

  def create
    @order = Order.new(params[:order])

		if @order.save
			render :json => { :success => true, :message => "Created new order #{@order.id}", :order => @order }
		else
			render :json => { :success => false, :message => "Failed to create order"}
		end

  end

  def update
    @order = Order.find(params[:id])

		if @order.update_attributes(params[:order])
			render :json => { :success => true, :message => "Update order #{@order.id}", :order => @order }
		else
			render :json => { :success => false, :message => "Failed to update order"}
		end
  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy

    render :json => { :success => true, :message => "Delete order #{@order.id}", :order => @order }
  end
end
