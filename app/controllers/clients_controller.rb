class ClientsController < ApplicationController
  # GET /clients
  # GET /clients.xml
  def index
    @clients = Client.all
    render :json => { :success => true, :message => "List All Client", :client => @clients }
    # respond_to do |format|
    #   format.html # index.html.erb
    #   format.xml  { render :xml => @clients }
    # end
  end

  # GET /clients/1
  # GET /clients/1.xml
  def show
    @client = Client.find(params[:id])
    render :json => { :success => true, :message => "Show Client", :client => @client }
    # respond_to do |format|
    #   format.html # show.html.erb
    #   format.xml  { render :xml => @client }
    # end
  end

  # GET /clients/new
  # GET /clients/new.xml
  def new
    @client = Client.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @client }
    end
  end

  # GET /clients/1/edit
  def edit
    @client = Client.find(params[:id])
  end

  # POST /clients
  # POST /clients.xml
  def create
    @client = Client.new(params[:client])

    # respond_to do |format|
      if @client.save
       render :json => { :success => true, :message => "Created new client #{@client.id}", :client => @client }
        # format.html { redirect_to(@client, :notice => 'Client was successfully created.') }
        # format.xml  { render :xml => @client, :status => :created, :location => @client }
      else
        render :json => { :success => false, :message => "Failed to create client"}
        # format.html { render :action => "new" }
        # format.xml  { render :xml => @client.errors, :status => :unprocessable_entity }
      end
    # end
  end

  # PUT /clients/1
  # PUT /clients/1.xml
  def update
    @client = Client.find(params[:id])

    # respond_to do |format|
      if @client.update_attributes(params[:client])
      #   format.html { redirect_to(@client, :notice => 'Client was successfully updated.') }
      #   format.xml  { head :ok }
        render :json => { :success => true, :message => "Update client #{@client.id}", :client => @client }
      else
        render :json => { :success => false, :message => "Failed to update client"}
        # format.html { render :action => "edit" }
        # format.xml  { render :xml => @client.errors, :status => :unprocessable_entity }
      end
    # end
  end

  # DELETE /clients/1
  # DELETE /clients/1.xml
  def destroy
    @client = Client.find(params[:id])
    @client.destroy
    render :json => { :success => true, :message => "Delete product #{@client.id}", :client => @client }
    # respond_to do |format|
    #   format.html { redirect_to(clients_url) }
    #   format.xml  { head :ok }
    # end
  end
end
